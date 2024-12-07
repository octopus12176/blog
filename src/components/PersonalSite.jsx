import { useState } from 'react';

function PersonalSite() {
  const [currentSection, setCurrentSection] = useState('books');
  const [books, setBooks] = useState([
    {
      id: 1,
      title: '人工知能の未来',
      author: '山田太郎',
      readDate: '2024年5月',
      thoughts: '技術の進歩について深く考えさせられた本。',
    },
  ]);

  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'AIと倫理',
      url: 'https://example.com/ai-ethics',
      summary: '人工知能の倫理的側面について詳細に論じた記事',
      dateRead: '2024年6月10日',
    },
  ]);

  const [thoughts, setThoughts] = useState([
    {
      id: 1,
      content: 'テクノロジーは社会をどのように変革できるか、常に考えている。',
      date: '2024年7月15日',
    },
  ]);

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    readDate: '',
    thoughts: '',
  });

  const [newArticle, setNewArticle] = useState({
    title: '',
    url: '',
    summary: '',
    dateRead: '',
  });

  const [newThought, setNewThought] = useState({ content: '' });

  // CRUD operations
  const addBook = () => {
    if (!newBook.title) return;
    const book = {
      id: Date.now(),
      ...newBook,
      readDate: newBook.readDate || new Date().toLocaleDateString(),
    };
    setBooks([book, ...books]);
    setNewBook({ title: '', author: '', readDate: '', thoughts: '' });
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const addArticle = () => {
    if (!newArticle.title) return;
    const article = {
      id: Date.now(),
      ...newArticle,
      dateRead: newArticle.dateRead || new Date().toLocaleDateString(),
    };
    setArticles([article, ...articles]);
    setNewArticle({ title: '', url: '', summary: '', dateRead: '' });
  };

  const deleteArticle = (id) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  const addThought = () => {
    if (!newThought.content) return;
    const thought = {
      id: Date.now(),
      content: newThought.content,
      date: new Date().toLocaleDateString(),
    };
    setThoughts([thought, ...thoughts]);
    setNewThought({ content: '' });
  };

  const deleteThought = (id) => {
    setThoughts(thoughts.filter((thought) => thought.id !== id));
  };

  const navItems = [
    {
      id: 'books',
      label: '読書記録',
      emoji: '📚',
      bgSelected: 'bg-blue-100',
      color: 'text-gray-600',
    },
    {
      id: 'articles',
      label: '良記事',
      emoji: '📑',
      bgSelected: 'bg-purple-100',
      color: 'text-gray-600',
    },
    {
      id: 'thoughts',
      label: '考えていること',
      emoji: '💭',
      bgSelected: 'bg-yellow-100',
      color: 'text-gray-600',
    },
  ];

  // インラインで削除ボタンを定義
  const renderDeleteButton = (onClickHandler) => (
    <button
      onClick={onClickHandler}
      className='group p-1.5 rounded-full transition-all duration-200 hover:bg-red-50 hover:scale-110'
      aria-label='削除'
    >
      <span className='text-gray-400 group-hover:text-red-500 transition-colors duration-200 text-sm font-medium'>
        ✕
      </span>
    </button>
  );

  return (
    <div className='fixed inset-0 bg-white'>
      <div className='flex h-full'>
        {/* サイドバー */}
        <div className='w-64 bg-white border-r border-gray-100'>
          <div className='p-6'>
            <h1 className='text-2xl font-bold text-blue-600'>Portfolio</h1>
            <p className='text-gray-500 mt-2 text-sm'>あなたの知的活動を記録</p>
          </div>

          <nav className='px-3'>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`w-full px-4 py-2 rounded-lg text-left mb-1 transition-colors duration-150
                  ${
                    currentSection === item.id
                      ? item.bgSelected
                      : 'bg-white hover:bg-gray-50'
                  } 
                  ${item.color}`}
              >
                <div className='flex items-center space-x-2'>
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* メインコンテンツ */}
        <main className='flex-1 bg-gray-50 overflow-auto'>
          <div className='max-w-3xl mx-auto py-6 px-8'>
            {/* 読書記録セクション */}
            {currentSection === 'books' && (
              <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-gray-900'>読書記録</h2>
                <div className='space-y-4'>
                  {books.map((book) => (
                    <div
                      key={book.id}
                      className='group bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200'
                    >
                      <div className='flex justify-between items-start'>
                        <div className='space-y-2'>
                          <h3 className='font-semibold text-gray-900'>
                            {book.title}
                          </h3>
                          <p className='text-sm text-gray-500'>
                            {book.author} - {book.readDate}
                          </p>
                          <p className='text-gray-700'>{book.thoughts}</p>
                        </div>
                        {renderDeleteButton(() => deleteBook(book.id))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='bg-white rounded-lg p-6 shadow-sm'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                    新しい本を追加
                  </h3>
                  <div className='space-y-4'>
                    <input
                      type='text'
                      placeholder='タイトル'
                      value={newBook.title}
                      onChange={(e) =>
                        setNewBook({ ...newBook, title: e.target.value })
                      }
                      className='w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-900'
                    />
                    <input
                      type='text'
                      placeholder='著者'
                      value={newBook.author}
                      onChange={(e) =>
                        setNewBook({ ...newBook, author: e.target.value })
                      }
                      className='w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-900'
                    />
                    <textarea
                      placeholder='感想'
                      value={newBook.thoughts}
                      onChange={(e) =>
                        setNewBook({ ...newBook, thoughts: e.target.value })
                      }
                      className='w-full px-3 py-2 rounded-md border border-gray-200 min-h-[100px] bg-white text-gray-900'
                    />
                    <button
                      onClick={addBook}
                      className='w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
                    >
                      追加する
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 良記事セクション */}
            {currentSection === 'articles' && (
              <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-gray-900'>良記事</h2>
                <div className='space-y-4'>
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className='group bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200'
                    >
                      <div className='flex justify-between items-start'>
                        <div className='space-y-2'>
                          <a
                            href={article.url}
                            className='font-semibold text-purple-600 hover:text-purple-700'
                          >
                            {article.title}
                          </a>
                          <p className='text-sm text-gray-500'>
                            {article.dateRead}
                          </p>
                          <p className='text-gray-700'>{article.summary}</p>
                        </div>
                        {renderDeleteButton(() => deleteArticle(article.id))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='bg-white rounded-lg p-6 shadow-sm'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                    新しい記事を追加
                  </h3>
                  <div className='space-y-4'>
                    <input
                      type='text'
                      placeholder='タイトル'
                      value={newArticle.title}
                      onChange={(e) =>
                        setNewArticle({ ...newArticle, title: e.target.value })
                      }
                      className='w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-900'
                    />
                    <input
                      type='text'
                      placeholder='URL'
                      value={newArticle.url}
                      onChange={(e) =>
                        setNewArticle({ ...newArticle, url: e.target.value })
                      }
                      className='w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-900'
                    />
                    <textarea
                      placeholder='要約'
                      value={newArticle.summary}
                      onChange={(e) =>
                        setNewArticle({
                          ...newArticle,
                          summary: e.target.value,
                        })
                      }
                      className='w-full px-3 py-2 rounded-md border border-gray-200 min-h-[100px] bg-white text-gray-900'
                    />
                    <button
                      onClick={addArticle}
                      className='w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors'
                    >
                      追加する
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 考えていることセクション */}
            {currentSection === 'thoughts' && (
              <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  考えていること
                </h2>
                <div className='space-y-4'>
                  {thoughts.map((thought) => (
                    <div
                      key={thought.id}
                      className='group bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200'
                    >
                      <div className='flex justify-between items-start'>
                        <div className='space-y-2'>
                          <p className='text-gray-700'>{thought.content}</p>
                          <p className='text-sm text-gray-500'>
                            {thought.date}
                          </p>
                        </div>
                        {renderDeleteButton(() => deleteThought(thought.id))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='bg-white rounded-lg p-6 shadow-sm'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                    新しい考えを追加
                  </h3>
                  <div className='space-y-4'>
                    <textarea
                      placeholder='あなたの考えを書き留めましょう'
                      value={newThought.content}
                      onChange={(e) =>
                        setNewThought({
                          ...newThought,
                          content: e.target.value,
                        })
                      }
                      className='w-full px-3 py-2 rounded-md border border-gray-200 min-h-[100px] bg-white text-gray-900'
                    />
                    <button
                      onClick={addThought}
                      className='w-full py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors'
                    >
                      追加する
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default PersonalSite;
