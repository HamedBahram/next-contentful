const handler = async (req, res) => {
  let inboundRevalToken = req.headers['x-vercel-reval-key']

  if (!inboundRevalToken) {
    return res
      .status(401)
      .json({ message: 'x-vercel-reval-key header not defined' })
  } else if (inboundRevalToken !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    let postSlug = req.body.fields.slug['en-US']
    await res.revalidate(`/posts/${postSlug}`)
    await res.revalidate('/posts')

    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}

export default handler
