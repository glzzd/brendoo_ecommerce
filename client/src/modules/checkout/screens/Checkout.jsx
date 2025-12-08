import { useTranslation } from 'react-i18next';

function Checkout() {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{t('checkout.title')}</h2>
      <p>{t('checkout.description')}</p>
    </div>
  );
}

export default Checkout;