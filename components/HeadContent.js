import { useState, useEffect } from 'react'
import Image from 'next/image'
import ErrorMessage from './ErrorMessage'
import axios from 'axios'
import CampsiteCard from './CampsiteCard'

const SEARCH_PLACEHOLDERS = [
  'Tent',
  'Cabin',
  'Lake',
  'River',
  'Mountain',
  'Tree',
  'Forest',
  'Bear',
  'Overnight',
  'Hike',
  'Picnic',
  'Beach'
]

const HeadContent = () => {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [searchData, setSearchData] = useState([])
  const [errors, setErrors] = useState([])
  const [inputIsFocused, setInputIsFocused] = useState(false)

  useEffect(() => {
    if (searchData.length > 1) {
      document.body.style.overflowY = 'scroll'
    } else {
      document.body.style.overflowY = 'hidden'
    }
  }, [searchData])

  const [placeholderContent, setPlaceholderContent] = useState(
    SEARCH_PLACEHOLDERS[Math.floor(Math.random() * SEARCH_PLACEHOLDERS.length)]
  )
  const [placeholder2Content, setPlaceholder2Content] = useState(
    SEARCH_PLACEHOLDERS[Math.floor(Math.random() * SEARCH_PLACEHOLDERS.length)]
  )
  const [hidePlaceholder2, setHidePlaceholder2] = useState(true)
  useEffect(() => {
    setInterval(
      () =>
        setPlaceholderContent(
          SEARCH_PLACEHOLDERS[
            Math.floor(Math.random() * SEARCH_PLACEHOLDERS.length)
          ]
        ),
      8000
    )

    setTimeout(() => {
      setHidePlaceholder2(false)
      setInterval(
        () =>
          setPlaceholder2Content(
            SEARCH_PLACEHOLDERS[
              Math.floor(Math.random() * SEARCH_PLACEHOLDERS.length)
            ]
          ),
        8000
      )
    }, 4000)
  }, [])

  const searchCampsites = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.get(`/api/search?q=${query}&location=${location}`)
      if (res.data.recdata) {
        setSearchData(res.data.recdata)
      } else {
        setErrors([...errors, res.data.error])
        setTimeout(() => setErrors([]), 2000)
      }
    } catch (err) {
      setErrors([...errors, err.message])
      setTimeout(() => setErrors([]), 2000)
    }
  }

  return (
    <div className='min-h-[calc(100vh-4.5rem)] flex flex-col items-center overflow-x-hidden'>
      <h1 className='text-4xl font-semibold text-midnight-blue mt-12'>
        Campsites.zone
      </h1>
      <form onSubmit={(e) => searchCampsites(e)}>
        <div className='relative mt-2 flex justify-between w-[min(90vw,700px)] h-10 rounded-sm bg-cultured overflow-hidden shadow-sm focus:shadow-md shadow-space-cadet'>
          <span
            style={{ opacity: inputIsFocused || query.length > 0 ? 0 : 1 }}
            className='text-gray-400 absolute left-2 top-2 placeholder-animation pointer-events-none'>
            {placeholderContent}
          </span>
          <span
            style={{
              opacity:
                inputIsFocused || hidePlaceholder2 || query.length > 0 ? 0 : 1
            }}
            className='text-gray-400 absolute left-2 top-2 placeholder-animation [animation-delay:4s] pointer-events-none'>
            {placeholder2Content}
          </span>
          <input
            type='text'
            className='pl-2 bg-cultured outline-none w-full'
            placeholder=''
            value={query}
            onBlur={() => setInputIsFocused(false)}
            onFocus={() => setInputIsFocused(true)}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type='submit'
            className='flex items-center justify-center px-2'>
            <Image src='/search.svg' alt='Search' width='25' height='25' />
          </button>
        </div>
        <div className='flex h-10 mt-2 justify-center gap-x-4'>
          <input
            type='text'
            className='bg-cultured outline-none pl-2 rounded-sm shadow-space-cadet shadow-sm'
            placeholder='Location'
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            type='submit'
            className='bg-french-rose text-cultured font-semibold rounded-sm px-2 shadow-sm shadow-space-cadet hover:bg-pink-600 transition-colors'>
            Search
          </button>
        </div>
      </form>
      <div className='flex flex-wrap gap-4 mt-4 justify-center'>
        {searchData.map((item, index) => (
          <CampsiteCard
            key={index}
            name={item.CampsiteName}
            id={item.CampsiteID}
            type={item.CampsiteType}
            attributes={item.ATTRIBUTES.slice(0, 3)}
            use={item.TypeOfUse}
            image={item.ENTITYMEDIA[0] ? item.ENTITYMEDIA[0].URL : ''}
            alt={item.ENTITYMEDIA[0] ? item.ENTITYMEDIA[0].title : 'No Image'}
          />
        ))}
      </div>
      {errors.map((item, index) => (
        <ErrorMessage key={index}>{item}</ErrorMessage>
      ))}
    </div>
  )
}

export default HeadContent
