import Head from 'next/head'
import axios from 'axios'
import Image from 'next/image'
import GoogleMapReact from 'google-map-react'
import Marker from '../../components/Marker'
import Link from 'next/link'
import Footer from '../../components/Footer'

const Campsite = ({
  name,
  use,
  location,
  type,
  loop,
  createdDate,
  lastUpdated,
  attributes,
  media,
  permittedEquipment,
  GOOGLE_MAPS_API_KEY
}) => {
  return (
    <>
      <Head>
        <title>{name} - Campsites.zone</title>
        <meta
          name='description'
          content={`${name} - Campsite on Campsites.zone`}
        />
      </Head>
      <div className='flex items-center justify-center min-h-screen'>
        <div className=' relative bg-cultured flex flex-col items-center xl:items-left rounded-sm shadow-sm shadow-space-cadet bg-opacity-80 w-[min(90vw,1000px)] p-4 my-4'>
          <Link href='../' passHref>
            <h3 className='md:absolute cursor-pointer left-4 top-4 text-2xl hover:text-space-cadet underline text-midnight-blue'>
              Campsites.zone
            </h3>
          </Link>
          <div>
            <h1 className='text-4xl text-midnight-blue font-semibold'>
              {name}
            </h1>
            <span className='text-sm text-space-cadet'>
              {type.substring(0, 1)}
              {type.substring(1).toLowerCase()} - {use}
            </span>
          </div>
          <div className='my-4 snap-x flex gap-x-8 overflow-x-scroll pb-2'>
            {media.map((item, index) => (
              <div
                key={index}
                className='relative flex-shrink-0 overflow-hidden max-h-[300px] max-w-[350px] snap-start'>
                <Image
                  src={item.url}
                  width={350}
                  className='rounded-sm'
                  height={250}
                  alt={item.subtitle ? item.subtitle : 'No Subtitle'}
                />
                <p className='text-sm text-space-cadet text-justify'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <h5 className='text-lg text-midnight-blue'>{loop}</h5>
          {location.latitude !== 0 && (
            <div className='w-[250px] h-[250px] md:w-[500px] md:h-[500px]'>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: GOOGLE_MAPS_API_KEY
                }}
                defaultCenter={{
                  lat: location.latitude,
                  lng: location.longitude
                }}
                defaultZoom={12}
                // yesIWantToUseGoogleMapApiInternals
                // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
              >
                <Marker
                  lat={location.latitude}
                  lng={location.longitude}
                  text='My Marker'
                />
              </GoogleMapReact>
            </div>
          )}
          {permittedEquipment.length > 0 && (
            <>
              <h5 className='text-midnight-blue text-lg mt-4'>
                Permitted Equipment:
              </h5>
              {permittedEquipment.map((item, index) => (
                <span key={index} className='ml-2'>
                  &bull; {item.EquipmentName}
                </span>
              ))}
            </>
          )}
          <div className='grid grid-cols-2 mt-4 gap-x-4'>
            {attributes.map(({ attribute, value }, index) => (
              <>
                <span key={index}>{attribute}:</span>
                <span>{value}</span>
              </>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps = async (context) => {
  const res = await axios.get(
    `${process.env.HOST_URL}/api/campsite/${context.params.id}`
  )
  const data = res.data
  return {
    props: {
      name: data.CampsiteName,
      use: data.TypeOfUse,
      location: {
        longitude: data.CampsiteLongitude,
        latitude: data.CampsiteLatitude
      },
      type: data.CampsiteType,
      loop: data.Loop,
      createdDate: data.CreatedDate,
      lastUpdated: data.LastUpdatedDate,
      attributes: data.ATTRIBUTES.map(({ AttributeName, AttributeValue }) => ({
        attribute: AttributeName,
        value: AttributeValue
      })),
      media: data.ENTITYMEDIA.map(
        ({
          MediaType,
          Title,
          Subtitle,
          Description,
          Height,
          Width,
          URL,
          Credits
        }) => ({
          type: MediaType,
          title: Title,
          subtitle: Subtitle,
          description: Description,
          height: Height,
          width: Width,
          url: URL,
          credits: Credits
        })
      ),
      permittedEquipment: data.PERMITTEDEQUIPMENT,
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
    }
  }
}

export default Campsite
