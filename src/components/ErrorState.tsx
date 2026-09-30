interface Props {
  message?: string
  onRetry?: () => void
}

export default function ErrorState({ message = 'Não foi possível carregar os dados.', onRetry }: Props) {
  return (
    <div className="state-card error-state">
      <div className="state-icon">⚠️</div>
      <h3>Algo deu errado</h3>
      <p>{message}</p>
      {onRetry && <button className="button" onClick={onRetry}>Tentar novamente</button>}
    </div>
  )
}