import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { fetchAPI } from '../utils/fetchAPI'
import { Videos } from './'

const SearchConts = () => {
  const [videos, setVideos] = useState(null);
  const { searchKeyword } = useParams();

  useEffect(() => {
    fetchAPI(`search?part=snippet&q=${searchKeyword}`).then((data) =>
      setVideos(data.items)
    );
  }, [searchKeyword]);

  console.log(searchKeyword)

  return (
    <main id="main">
      <div className='searchCont'>
        <div className="result"><span>{searchKeyword}</span>를 검색하였습니다.</div>
        <Videos videos={videos}/>
      </div>
    </main>
    )
}

export default SearchConts
