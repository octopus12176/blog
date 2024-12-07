import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { X } from 'lucide-react';

function PersonalSite() {
  const [currentSection, setCurrentSection] = useState('books');
  const [books, setBooks] = useState([]);
  const [articles, setArticles] = useState([]);
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // 初期データの読み込み
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchBooks(), fetchArticles(), fetchThoughts()]);
    } catch (error) {
      console.error('データの読み込みに失敗しました:', error);
      setError('データの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // 本のCRUD操作
  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    setBooks(data);
  };

  const addBook = async () => {
    if (!newBook.title) return;

    try {
      const { data, error } = await supabase
        .from('books')
        .insert([
          {
            title: newBook.title,
            author: newBook.author,
            read_date: newBook.readDate || new Date().toISOString(),
            thoughts: newBook.thoughts,
          },
        ])
        .select();

      if (error) throw error;

      setBooks([data[0], ...books]);
      setNewBook({ title: '', author: '', readDate: '', thoughts: '' });
    } catch (error) {
      console.error('本の追加に失敗しました:', error);
      setError('本の追加に失敗しました');
    }
  };

  const deleteBook = async (id) => {
    try {
      const { error } = await supabase.from('books').delete().eq('id', id);

      if (error) throw error;
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error('本の削除に失敗しました:', error);
      setError('本の削除に失敗しました');
    }
  };

  // 記事のCRUD操作
  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    setArticles(data);
  };

  const addArticle = async () => {
    if (!newArticle.title) return;

    try {
      const { data, error } = await supabase
        .from('articles')
        .insert([
          {
            title: newArticle.title,
            url: newArticle.url,
            summary: newArticle.summary,
            date_read: newArticle.dateRead || new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;

      setArticles([data[0], ...articles]);
      setNewArticle({ title: '', url: '', summary: '', dateRead: '' });
    } catch (error) {
      console.error('記事の追加に失敗しました:', error);
      setError('記事の追加に失敗しました');
    }
  };

  const deleteArticle = async (id) => {
    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);

      if (error) throw error;
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.error('記事の削除に失敗しました:', error);
      setError('記事の削除に失敗しました');
    }
  };

  // 考えのCRUD操作
  const fetchThoughts = async () => {
    const { data, error } = await supabase
      .from('thoughts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    setThoughts(data);
  };

  const addThought = async () => {
    if (!newThought.content) return;

    try {
      const { data, error } = await supabase
        .from('thoughts')
        .insert([
          {
            content: newThought.content,
            date: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;

      setThoughts([data[0], ...thoughts]);
      setNewThought({ content: '' });
    } catch (error) {
      console.error('考えの追加に失敗しました:', error);
      setError('考えの追加に失敗しました');
    }
  };

  const deleteThought = async (id) => {
    try {
      const { error } = await supabase.from('thoughts').delete().eq('id', id);

      if (error) throw error;
      setThoughts(thoughts.filter((thought) => thought.id !== id));
    } catch (error) {
      console.error('考えの削除に失敗しました:', error);
      setError('考えの削除に失敗しました');
    }
  };

  const navItems = [
    {
      id: 'books',
      label: '本',
      emoji: '📚',
      bgSelected: 'bg-blue-100',
      color: 'text-gray-600',
    },
    {
      id: 'articles',
      label: '記事',
      emoji: '📑',
      bgSelected: 'bg-purple-100',
      color: 'text-gray-600',
    },
    {
      id: 'thoughts',
      label: '考え',
      emoji: '💭',
      bgSelected: 'bg-yellow-100',
      color: 'text-gray-600',
    },
  ];

  // インラインの削除ボタン
  const renderDeleteButton = (onClickHandler) => (
    <button
      onClick={onClickHandler}
      className='group bg-red-50 p-2 rounded-full hover:bg-red-100 transition-colors duration-200'
      aria-label='削除'
    >
      <X
        className='text-red-500 group-hover:text-red-600 transition-colors duration-200'
        size={16}
      />
    </button>
  );

  // ローディングとエラーの状態
  if (loading) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-white'>
        <div className='text-lg text-gray-600'>読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-white'>
        <div className='text-lg text-red-600'>{error}</div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 bg-white'>
      <div className='flex h-full flex-col md:flex-row'>
        {/* サイドバー */}
        <div className='w-full md:w-64 bg-white border-r border-gray-100 mb-6 md:mb-0'>
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
          <div className='max-w-3xl mx-auto py-6 px-4 sm:px-8'>
            {/* 本のセクション */}
            {currentSection === 'books' && (
              <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-gray-900'>本</h2>
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
                            {book.author} - {book.read_date}
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

            {/* 記事のセクション */}
            {currentSection === 'articles' && (
              <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-gray-900'>記事</h2>
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
                            {article.date_read}
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

            {/* 考えのセクション */}
            {currentSection === 'thoughts' && (
              <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-gray-900'>考え</h2>
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
