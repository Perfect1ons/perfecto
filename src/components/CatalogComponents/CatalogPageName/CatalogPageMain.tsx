import styles from "./style.module.scss";

export default function CatalogPageMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={styles.main}>{children}</main>;
}
