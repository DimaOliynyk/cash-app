import './index.css'

export default function LoadingPage() {
  return (
    <div className="loading-page">
      <div className="loading-spinner"></div>
      <h2 className="loading-text">Signing you in...</h2>
      <p className="loading-subtext">Please wait a moment</p>
    </div>
  );
}