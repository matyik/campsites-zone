import Image from 'next/image'
import Link from 'next/link'

const CampsiteCard = ({ key, name, use, type, attributes, image, alt, id }) => {
  return (
    <Link href={`/campsite/${id}`} passHref key={key}>
      <div className='bg-cultured bg-opacity-80 backdrop-blur-sm rounded-sm shadow-sm shadow-space-cadet w-80 p-2 cursor-pointer hover:[transform:scale(0.975)] transition-transform overflow-hidden'>
        <div className='flex justify-between'>
          <h3 className='text-midnight-blue text-2xl'>{name}</h3>
          <span className='text-md text-space-cadet'>{use}</span>
        </div>
        <span className='text-french-rose text-sm'>
          {`${type.substring(0, 1)}${type.substring(1).toLowerCase()}`}
        </span>
        {image && (
          <Image
            className='rounded-sm'
            src={image}
            alt={alt}
            width='320'
            height='180'
          />
        )}
        <div className='grid grid-cols-2'>
          {attributes.map((item, index) => (
            <>
              <span key={index} className='text-sm'>
                {item.AttributeName}
              </span>
              <span className='text-sm'>{item.AttributeValue}</span>
            </>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default CampsiteCard
