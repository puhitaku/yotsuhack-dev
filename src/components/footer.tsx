import sharedStyles from '../styles/shared.module.css'

export default props => (
  <>
    <footer className={sharedStyles.withlove}>
      <div>
        <span>FROM A COMPUTER WITH </span>
        <span className={sharedStyles.love}>♥</span>
      </div>
      {props.isIndex && (
        <div className={sharedStyles.thanks}>
          Special thanks to JJ Kasper for developing{' '}
          <a href="https://notion-blog.now.sh/">My Notion Blog</a>.
        </div>
      )}
    </footer>
  </>
)
