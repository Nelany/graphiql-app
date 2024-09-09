import { useTranslation } from 'react-i18next';
import styles from './ShowButtons.module.css';

interface ButtonsShowProps {
  onShowHeaders: () => void;
  onShowVariables: () => void;
}

const ButtonsShow: React.FC<ButtonsShowProps> = ({ onShowHeaders, onShowVariables }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.buttonsShowWrapper}>
      <button className={styles.buttonsShow} onClick={onShowHeaders}>
        {t('RESTGraphQL:showHeaders')}
      </button>
      <button className={styles.buttonsShow} onClick={onShowVariables}>
        {t('RESTGraphQL:showVariables')}
      </button>
    </div>
  );
};

export default ButtonsShow;
