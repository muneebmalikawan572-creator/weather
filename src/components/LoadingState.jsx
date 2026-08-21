export default function LoadingState() {
  return (
    <div className="panel-state" role="status" aria-live="polite">
      <div className="loading-dial" aria-hidden="true" />
      <p>Reading the instruments…</p>
    </div>
  )
}
