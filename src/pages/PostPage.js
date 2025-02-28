import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderContext } from "../components/Layout";

const API_URL = 'https://a1w.ru/wp-json/wp/v2/posts';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  // Задаем отступ у слайдера исходя из высоты хэдэра
  const headerHeight = useContext(HeaderContext);

  useEffect(() => {
    fetch(`${API_URL}/${id}?_embed`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки поста:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (!post) return <p>Пост не найден</p>;

  return (
    <div className="lcontainer" style={{ paddingTop: `${headerHeight}px` }}>
      <div className='postcontent'>
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <img src={post._embedded['wp:featuredmedia']?.[0]?.source_url} alt={post.title.rendered} />
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
    </div>
  );
}

export default PostPage;
