import React from 'react'

import { categories } from '../utils/content'

const Category = ({ selectCategory, setSelectCategory }) => {
  return (
    <div>
      {categories.map((category) => (
        <button
          style={{
            backgroundColor:
              category.name === selectCategory ? 'rgb(81, 70, 70)' : null,
            padding: category.name === selectCategory ? '5px 15px' : null,
            borderRadius: category.name === selectCategory ? '50px' : null,
          }}
          key={category.name}
          onClick={() => setSelectCategory(category.name)}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  )
}

export default Category
