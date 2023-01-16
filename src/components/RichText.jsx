import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const Text = ({ children }) => <p className='mt-4'>{children}</p>

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className='mt-4 title text-3xl'>{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className='mt-4 title text-2xl'>{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className='mt-4 title text-xl'>{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <h4 className='mt-4 title text-lg'>{children}</h4>
    )
  }
}

const RichText = ({ content }) => {
  return <>{documentToReactComponents(content, options)}</>
}

export default RichText
