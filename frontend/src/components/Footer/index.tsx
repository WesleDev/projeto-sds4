const Footer = () => {
  return (
    <footer className='footer mt-auto py-3 bg-dark'>
      <div className='container'>
        <p className='text-light'>
          App desenvolvido por{' '}
          <a
            href='https://github.com/wesledev'
            target='_blank'
            rel='noreferrer'
          >
            Wesle Dev
          </a>
        </p>
        <p className='text-light'>
          <small>
            <strong>Semana Spring React</strong>
            <br />
            Evento promovido pela escola DevSuperior:
            <a
              href='https://instagram.com/wesleleal'
              target='_blank'
              rel='noreferrer'
            >
              @wesleleal
            </a>
          </small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
