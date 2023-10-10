import styles from './block-info.module.scss';

interface BlockInfoProps {
  additionalStyles?: string;
  children: string | JSX.Element;
}

const BlockInfo: React.FC<BlockInfoProps> = (props) => {
  return (
    <div className={`${styles.container} ${props.additionalStyles}`}>
      {props.children}
    </div>
  );
};

export default BlockInfo;
