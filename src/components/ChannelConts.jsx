import React, { useEffect, useState } from 'react'
import { fetchAPI } from '../utils/fetchAPI'
import { useParams } from 'react-router-dom'
import { Videos } from './'
import { Loader } from './'

const ChannelConts = () => {
  const [channelDetail, setChannelDetail] = useState()
  const [videos, setVideos] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchAPI(`channels?part=snippet,&id=${id}`)

      setChannelDetail(data?.items[0])

      const videosData = await fetchAPI(
        `search?channelId=${id}&part=snippet&order=date`
      )
      setVideos(videosData?.items)
    }
    fetchResults()
  }, [id])

  if (!videos?.length) return <Loader />

  return (
    <section id="channelConts">
      <div className="container">
        <div className="channel-header">
          <img
            src={channelDetail.brandingSettings?.image?.bannerExternalUrl}
            alt="배너"
          />
        </div>
        <div className="channel-info">
          <img
            src={channelDetail.snippet?.thumbnails.medium?.url}
            alt="프로필사진"
          />
          <div className="infoview">
            <h3>{channelDetail?.brandingSettings?.channel.title}</h3>
            <p>{channelDetail?.snippet?.customUrl}</p>
            <p>구독자 {channelDetail?.statistics?.subscriberCount}</p>
          </div>
        </div>
        <div className="channel-videos">
          <Videos videos={videos} />
        </div>
      </div>
    </section>
  )
}

export default ChannelConts
