import { useTranslation } from 'react-i18next';

function Register() {
  const { t } = useTranslation();
  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-2">{t('register.title')}</h2>
      <p>{t('register.description')}</p>
    </div>
  );
}

export default Register;