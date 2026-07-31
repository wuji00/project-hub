# Project Hub · 实时监控脚本
# 用途：每 30 秒拉 plan 状态，更新 status.json，让 progress.html 自动刷新
# 用法：powershell -ExecutionPolicy Bypass -File monitor.ps1

$planId = "plan_058d8eee"
$statusPath = "E:/code/minimax-code/project-hub/cycles/cycle-01/status.json"
$planDir = "E:/code/minimax-code/project-hub/.mavis/plans"
$logFile = "E:/code/minimax-code/project-hub/cycles/cycle-01/monitor.log"

# 已见过的 task 状态缓存（用于只在新事件时追加 log）
$script:seenEvents = @{}
$script:lastLog = @()

function Load-Status {
  if (Test-Path $statusPath) {
    $s = Get-Content $statusPath -Raw -Encoding UTF8 | ConvertFrom-Json
    return $s
  }
  return $null
}

function Save-Status($s) {
  $s.last_check_at = (Get-Date -Format "yyyy-MM-ddTHH:mm:sszzz")
  $s | ConvertTo-Json -Depth 8 -Compress | Set-Content -Path $statusPath -Encoding UTF8
}

function Append-Log($s, $msg, $level = "dim") {
  $now = Get-Date
  $ts = "{0:HH}:{0:mm}" -f $now
  $s.log += [PSCustomObject]@{ ts = $ts; level = $level; msg = $msg }
  # 保留最近 80 条
  if ($s.log.Count -gt 80) { $s.log = $s.log[($s.log.Count - 80)..($s.log.Count - 1)] }
}

function Parse-Plan-Status {
  try {
    $out = mavis team plan status $planId --human 2>&1 | Out-String
    return $out
  } catch {
    return $null
  }
}

# 启动
$initial = Load-Status
if ($initial) {
  Append-Log $initial "monitor 启动，每 30s 拉 plan 状态" "dim"
  Save-Status $initial
  Add-Content -Path $logFile -Value "$(Get-Date -Format 'o') monitor started, plan=$planId" -Encoding UTF8
}

while ($true) {
  Start-Sleep -Seconds 30

  $status = Load-Status
  if (-not $status) { continue }

  $planOutput = Parse-Plan-Status
  if (-not $planOutput) {
    Append-Log $status "mavis team plan status 调用失败" "warn"
    Save-Status $status
    continue
  }

  # 简单解析：检测 task 状态关键词
  $changed = $false

  # Plan 整体状态
  if ($planOutput -match "Status\s+(\w+)") {
    $newPlanStatus = $matches[1].Trim()
    if ($newPlanStatus -ne $status.status) {
      $oldStatus = $status.status
      $status.status = $newPlanStatus
      Append-Log $status "Plan status: $oldStatus → $newPlanStatus" "ok"
      $changed = $true

      if ($newPlanStatus -eq "completed") {
        Append-Log $status "✅ Plan 完成，触发 review" "ok"
      }
    }
  }

  # 当前活跃 task
  if ($planOutput -match "Current task:\s*(\S+)") {
    $newCurrent = $matches[1].Trim()
    if ($newCurrent -ne $status.current_task) {
      $oldCurrent = $status.current_task
      $status.current_task = $newCurrent
      Append-Log $status "当前 task: $oldCurrent → $newCurrent" "ok"
      $changed = $true

      # 标记上一个 task 完成
      if ($oldCurrent -and $status.tasks.$oldCurrent) {
        $status.tasks.$oldCurrent.status = "done"
        Append-Log $status "task <b>$oldCurrent</b> 完成，等待 verifier" "ok"
      }
      # 标记新 task 为 running
      if ($newCurrent -and $status.tasks.$newCurrent) {
        $status.tasks.$newCurrent.status = "running"
      }
    }
  }

  # 检测 retry（如果 plan output 里出现 retried 或 attempt N+1）
  foreach ($taskName in @("scaffold","unit-typography","unit-aurora","unit-hero","unit-cards","unit-filter","final-gate")) {
    if ($planOutput -match "task\s+$taskName.*retried" -or $planOutput -match "retrying\s+$taskName") {
      if ($status.tasks.$taskName) {
        $newRetries = $status.tasks.$taskName.retries + 1
        if ($newRetries -gt $status.tasks.$taskName.retries) {
          $status.tasks.$taskName.retries = $newRetries
          Append-Log $status "task <b>$taskName</b> retry #$newRetries" "warn"
          $changed = $true
        }
      }
    }
  }

  if ($changed) {
    Save-Status $status
    Add-Content -Path $logFile -Value "$(Get-Date -Format 'o') state changed" -Encoding UTF8
  }
}
