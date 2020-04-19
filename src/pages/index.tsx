import Link from 'next/link'
import Header from '../components/header'
import sharedStyles from '../styles/shared.module.css'
import blogStyles from '../styles/blog.module.css'
import contactStyles from '../styles/contact.module.css'
import { getBlogLink, getDateStr, postIsPublished } from '../lib/blog-helpers'
import { textBlock } from '../lib/notion/renderers'

import getNotionUsers from '../lib/notion/getNotionUsers'
import getBlogIndex from '../lib/notion/getBlogIndex'

import Logo from '../components/svgs/logo'
import Twitter from '../components/svgs/twitter'
import Facebook from '../components/svgs/facebook'
import GitHub from '../components/svgs/github'
import LinkedIn from '../components/svgs/linkedin'
import ExtLink from '../components/ext-link'

const contacts = [
  {
    Comp: Twitter,
    alt: 'twitter icon',
    link: 'https://twitter.com/puhitaku',
  },
  {
    Comp: Facebook,
    alt: 'facebook icon',
    link: 'https://www.facebook.com/puhitaku/',
  },
  {
    Comp: GitHub,
    alt: 'github icon',
    link: 'https://github.com/puhitaku',
  },
  {
    Comp: LinkedIn,
    alt: 'linkedin icon',
    link: 'https://www.linkedin.com/in/takumi-sueda-110026195/',
  },
]

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...authorsToGet])

  posts.map(post => {
    post.Authors = post.Authors.map(id => users[id].full_name)
  })

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  }
}

export default ({ posts = [], preview }) => {
  return (
    <>
      <Header />
      <div className={sharedStyles.biglogo}>
        <Logo />
        <h1>YOTSUHACK</h1>
      </div>
      <div className={sharedStyles.sep} />
      <div className={sharedStyles.layout}>
        <h1>WORKS</h1>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        {posts.map(post => {
          return (
            <div className={blogStyles.postPreview} key={post.Slug}>
              <h3>
                <span className={blogStyles.postedDate}>
                  {getDateStr(post.Date)}
                </span>
                <Link href="/works/[slug]" as={getBlogLink(post.Slug)}>
                  <div className={blogStyles.titleContainer}>
                    {!post.Published && (
                      <span className={blogStyles.draftBadge}>Draft</span>
                    )}
                    <a>{post.Page}</a>
                  </div>
                </Link>
              </h3>
              <p>
                {(!post.preview || post.preview.length === 0) &&
                  'No preview available'}
                {(post.preview || []).map((block, idx) =>
                  textBlock(block, true, `${post.Slug}${idx}`)
                )}
              </p>
            </div>
          )
        })}
      </div>
      <div className={sharedStyles.sep} />
      <div className={sharedStyles.layout}>
        <h1>CONTACT</h1>
        <div className={contactStyles.avatar}>
          <img src="/avatar.png" alt="my illustrated portrait" />
        </div>
        <div className={contactStyles.name}>
          Takumi Sueda <span className={contactStyles.aka}>a.k.a.</span>{' '}
          puhitaku
        </div>
        <div className={contactStyles.name}>
          Sole Proprietorship / Freelance
        </div>
        <div className={contactStyles.links}>
          {contacts.map(({ Comp, link, alt }) => {
            return (
              <ExtLink key={link} href={link} aria-label={alt}>
                <Comp height={32} />
              </ExtLink>
            )
          })}
        </div>
      </div>
    </>
  )
}
