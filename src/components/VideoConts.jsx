import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link, useParams } from 'react-router-dom'
import { fetchAPI } from '../utils/fetchAPI'
import { Loader } from './'

function ListText({ list }) {
  return (
    <div className="list">
      <Link to={`/video/${list.id.videoId}`}>
        <img src={list.snippet?.thumbnails?.high?.url} alt="" />
      </Link>
      <div className="list__box">
        <Link to={`/video/${list.id.videoId}`}>
          <h3 className="list__tit">{list.snippet.title}</h3>
        </Link>
        <p className="list__desc">{list.snippet.description}</p>
      </div>
    </div>
  )
}

const VideoConts = () => {
  const [videoDetail, setVideoDetail] = useState(null)
  const [videos, setVideos] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    fetchAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    )

    fetchAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    )
  }, [id])

  // const {
  //   snippet: { title, channelId, channelTitle },
  //   statistics: { viewCount, likeCount },
  // } = videoDetail
  if (!videos?.length) return <Loader />
  return (
    <section className="videoConts">
      <div className="container">
        <div className="video__inner">
          <div className="left">
            <div className="play">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
              />
            </div>
            <div className="desc">
              <h2>{videoDetail.snippet.title}</h2>
              <p>{videoDetail.snippet.description}</p>
            </div>
          </div>
          <div className="right">
            {videos.map((list, idx) =>
              idx < 7 ? <ListText key={idx} list={list} /> : null
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoConts
