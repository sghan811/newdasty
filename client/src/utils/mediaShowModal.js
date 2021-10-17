export const imageShowModal = (src, theme) => {
  return <img src={src} className="img-show-modal" alt="uploaded pics" />;
};
export const imageShowModalCommuBg = (src, theme) => {
  return (
    <img src={src} className="img-show-modalcommubg" alt="uploaded pics" />
  );
};
export const imageShowModalCommuPf = (src, theme) => {
  return (
    <img src={src} className="img-show-modalcommupf" alt="uploaded pics" />
  );
};

export const videoShowModal = (src, theme) => {
  return (
    <video controls src={src} className="img-show-modal" alt="uploaded pics" />
  );
};
