export default function Loading({ text = 'Carregando dados...' }: { text?: string }) {
  return (
    <div className="loading">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  )
}