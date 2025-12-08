import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{t('dashboard.title')}</h2>
      <p>{t('dashboard.description')}</p>
    </div>
  );
}

export default Dashboard;