export default function ErrorState({ message }) {
  return (
    <div className="panel-state panel-state--error" role="alert">
      <p className="error-title">Station log empty</p>
      <p>{message}</p>
    </div>
  )
}
