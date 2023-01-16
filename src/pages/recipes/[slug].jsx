import client from '@/lib/contentful/client'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Skeleton from '@/components/recipes/Skeleton'
import RichText from '@/components/RichText'

const Recipe = ({ recipe }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Skeleton />
  }

  const { featuredImage, title, cookingTime, ingredients, instructions } =
    recipe.fields

  return (
    <div>
      <div>
        <Image
          alt='title'
          src={`https:${featuredImage.fields.file.url}`}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
          className='h-54 sm:h-96 object-cover object-center'
        />
      </div>
      <h2 className='mt-4 text-2xl font-bold'>{title}</h2>
      <p>Takes about {cookingTime} mins to cook.</p>
      <h3 className='mt-6 text-xl font-medium'>Ingredients:</h3>
      <ul className='mt-2 list-[disc] list-inside marker:text-red-400'>
        {ingredients.map(ingredient => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <div>
        <h3 className='mt-10 text-xl font-medium'>Instructions:</h3>
        <div className='mt-3'>
          <RichText content={instructions} />
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params
  const response = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': slug
  })

  if (!response?.items?.length) {
    return {
      redirect: {
        destination: '/recipes',
        permanent: false
      }
    }
  }

  return {
    props: {
      recipe: response?.items?.[0],
      revalidate: 60
    }
  }
}

export const getStaticPaths = async () => {
  const response = await client.getEntries({ content_type: 'recipe' })
  const paths = response.items.map(item => ({
    params: { slug: item.fields.slug }
  }))

  return {
    paths,
    fallback: true
  }
}

export default Recipe
