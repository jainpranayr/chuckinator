import { useState, useEffect } from 'react'

const API_URL = 'https://api.chucknorris.io/jokes/'

function App() {
  const [categories, setCategories] = useState(['random'])
  const [joke, setJoke] = useState({})
  const [selectedCategory, setSelectedCategory] = useState('random')

  const generateJoke = selectedCategory => {
    if (selectedCategory === 'random') {
      fetch(API_URL + selectedCategory)
        .then(res => res.json())
        .then(data => setJoke(data.value))
    } else {
      fetch(`${API_URL}random?category=${selectedCategory}`)
        .then(res => res.json())
        .then(data => setJoke(data.value))
    }
  }

  const generateCategories = () => {
    fetch(API_URL + 'categories')
      .then(res => res.json())
      .then(data => setCategories(data))
  }

  const handleClick = e => {
    const category = e.target.childNodes[0].data
    setSelectedCategory(category)
  }

  const handleBtnClick = () => {
    generateJoke(selectedCategory)
  }

  useEffect(() => {
    generateCategories()
    generateJoke(selectedCategory)
  }, [selectedCategory])

  return (
    <div className='App'>
      <aside>
        <ul>
          {categories.map((category, idx) => (
            <li
              key={idx}
              onClick={handleClick}
              className={category === selectedCategory ? 'selected' : ''}>
              {category}
            </li>
          ))}
        </ul>
      </aside>
      <hr />
      <section>
        <div className='joke-container'>
          <h1 className='title'>Chuckinator</h1>
          <p
            className='joke'
            dangerouslySetInnerHTML={{
              __html: joke?.length > 0 ? joke : 'loading..',
            }}></p>
        </div>
        <button className='btn' onClick={handleBtnClick}>
          Get Random Joke 😂
        </button>
      </section>
    </div>
  )
}

export default App
