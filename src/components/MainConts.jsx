import React, { useEffect, useState } from 'react'

import { fetchAPI } from '../utils/fetchAPI'

import { Category, Videos } from './'

const MainConts = () => {
  const [selectCategory, setSelectCategory] = useState('epl')
  const [videos, setVideos] = useState(null)

  useEffect(() => {
    fetchAPI(`search?part=snippet&q=${selectCategory}&type=video`).then(
      (data) => setVideos(data.items)
    )
  }, [selectCategory])

  return (
    <main id="main">
      <aside id="aside">
        <Category
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
        />
      </aside>
      <section id="contents">
        <h2>
          <em>{selectCategory}</em> News
        </h2>
        <Videos videos={videos} />
      </section>
    </main>
  )
}

export default MainConts
