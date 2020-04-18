import '../styles/global.css'
import sharedStyles from '../styles/shared.module.css'

export default ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />

    <footer className={sharedStyles.withlove}>
      <span>FROM A COMPUTER WITH </span>
      <span className={sharedStyles.love}>♥</span>
    </footer>
  </>
)
