import RecipeCard from '@/components/recipes/RecipeCard'
import client from '@/lib/contentful/client'

const Recipes = ({ recipes }) => {
  return (
    <div>
      <h1 className='text-3xl font-bold'>Recipes</h1>
      <ul className='mt-8 grid grid-cols-2 gap-6'>
        {recipes.map(recipe => (
          <RecipeCard key={recipe.sys.id} recipe={recipe} />
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: 'recipe' })

  return {
    props: {
      recipes: response.items,
      revalidate: 60
    }
  }
}

export default Recipes
