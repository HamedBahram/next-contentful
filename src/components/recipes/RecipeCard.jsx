import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

const RecipeCard = ({ recipe }) => {
  const { title, slug, cookingTime, thumbnail } = recipe.fields

  return (
    <li className='border'>
      <div>
        <Image
          alt={title}
          src={`https:${thumbnail.fields.file.url}`}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
        />
      </div>
      <div className='p-4'>
        <h2 className='text-xl font-medium'>{title}</h2>
        <p className='text-sm text-stone-400'>
          Takes {cookingTime} mins to make
        </p>
        <Link
          href={`/recipes/${slug}`}
          className='mt-4 flex items-center gap-1 text-sm uppercase text-stone-400'
        >
          <span>See More</span>
          <ArrowRightIcon className='w-5 h-5 text-emerald-400' />
        </Link>
      </div>
    </li>
  )
}

export default RecipeCard
