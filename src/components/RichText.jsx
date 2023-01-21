import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'
import ContentfulImage from './ui/ContentfulImage'

const options = {
  renderMark: {
    [MARKS.CODE]: text => {
      return (
        <pre>
          <code>{text}</code>
        </pre>
      )
    }
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (
        node.content.find(item =>
          item.marks?.find(mark => mark.type === 'code')
        )
      ) {
        return (
          <div>
            <pre>
              <code>{children}</code>
            </pre>
          </div>
        )
      }

      return <p>{children}</p>
    },

    [INLINES.ENTRY_HYPERLINK]: node => {
      if (node.data.target.sys.contentType.sys.id === 'post') {
        return (
          <Link href={`/posts/${node.data.target.fields.slug}`}>
            {node.data.target.fields.title}
          </Link>
        )
      }
    },

    [INLINES.HYPERLINK]: node => {
      const text = node.content.find(item => item.nodeType === 'text')?.value
      return (
        <a href={node.data.uri} target='_blank' rel='noopener noreferrer'>
          {text}
        </a>
      )
    },

    [BLOCKS.EMBEDDED_ENTRY]: node => {
      if (node.data.target.sys.contentType.sys.id === 'videoEmbed') {
        return (
          <iframe
            height='400'
            width='100%'
            src={node.data.target.fields.embedUrl}
            title={node.data.target.fields.title}
            allowFullScreen={true}
          />
        )
      }
    },

    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <ContentfulImage
          src={node.data.target.fields.file.url}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.title}
          className='h-20 w-20'
        />
      )
    }
  }
}

const RichText = ({ content }) => {
  return <>{documentToReactComponents(content, options)}</>
}

export default RichText
