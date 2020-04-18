export const getBlogLink = (slug: string) => {
  return `/works/${slug}`
}

export const getDateStr = date => {
  return new Intl.DateTimeFormat(undefined, {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(date)
}

export const postIsPublished = (post: any) => {
  return post.Published === 'Yes'
}

export const normalizeSlug = slug => {
  if (typeof slug !== 'string') return slug

  let startingSlash = slug.startsWith('/')
  let endingSlash = slug.endsWith('/')

  if (startingSlash) {
    slug = slug.substr(1)
  }
  if (endingSlash) {
    slug = slug.substr(0, slug.length - 1)
  }
  return startingSlash || endingSlash ? normalizeSlug(slug) : slug
}
