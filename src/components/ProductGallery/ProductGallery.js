import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./ProductGallery.scss";
import IconClose from "./icon-close.svg?react";
import IconNext from "./icon-next.svg?react";
import IconPrevious from "./icon-previous.svg?react";

function ProductGallery(props) {
    const { images } = props;
    const [currentImage, setCurrentImage] = useState({ image: images[0].image, index: 0 });
    const [lightBoxEnabled, setLightBoxEnabled] = useState(false);

    const onMediaQueryChange = (matches) => {
        if (matches) onLightBoxEnabled(false);
    }
    const isMobile = useMediaQuery({ maxWidth: 576 }, undefined, onMediaQueryChange)

    const onLightBoxEnabled = (isEnabled) => {
        if (isEnabled) {
            window.scrollTo(0, 0);
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        setLightBoxEnabled(isEnabled)
    }

    const onLightBoxNav = (nav) => {
        const thumbnailTotal = images.length;
        if (nav == 'next') {
            if (currentImage.index + 1 == thumbnailTotal) {
                setCurrentImage({ image: images[0].image, index: 0 })
            } else {
                setCurrentImage({ image: images[currentImage.index + 1].image, index: currentImage.index + 1 })
            }
        }

        if (nav == 'prev') {
            if (currentImage.index - 1 < 0) {
                setCurrentImage({ image: images[thumbnailTotal - 1].image, index: thumbnailTotal - 1 })
            } else {
                setCurrentImage({ image: images[currentImage.index - 1].image, index: currentImage.index - 1 })
            }
        }
    }

    return (
        <div className="product-gallery">
            <div className="product-image">
                <img className="product-main-image" src={currentImage.image} onClick={() => {
                    if (!isMobile) onLightBoxEnabled(true)
                }} />
                <IconPrevious className="icon-previous" onClick={() => onLightBoxNav('prev')} />
                <IconNext className="icon-next" onClick={() => onLightBoxNav('next')} />
            </div>
            <div className="product-thumbnails">
                {images.map((image, index) => {
                    return (
                        <div className="thumbnail" key={index}>
                            <div className="thumbnail-wrap" onClick={() => setCurrentImage({ image: image.image, index: index })}>
                                <img src={image.thumbnail} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <GalleryLightBox
                images={images}
                lightBoxEnabled={lightBoxEnabled}
                setLightBoxEnabled={onLightBoxEnabled}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
                onLightBoxNav={onLightBoxNav} />
        </div>
    );
}

function GalleryLightBox(props) {

    const { images, lightBoxEnabled, setLightBoxEnabled, currentImage, setCurrentImage, onLightBoxNav } = props;

    return (
        <div className={`product-gallery-lightbox ${lightBoxEnabled ? 'light-box-enabled' : null}`}>
            <div className="lightbox-wrap">
                <div className="product-image">
                    <img className="product-main-image" src={currentImage.image} />
                    <IconClose className="icon-close" onClick={() => setLightBoxEnabled(false)} />
                    <IconPrevious className="icon-previous" onClick={() => onLightBoxNav('prev')} />
                    <IconNext className="icon-next" onClick={() => onLightBoxNav('next')} />
                </div>
                <div className="product-thumbnails">
                    {images.map((image, index) => {
                        return (
                            <div className="thumbnail" key={index}>
                                <div className="thumbnail-wrap" onClick={() => setCurrentImage({ image: image.image, index: index })}>
                                    <img src={image.thumbnail} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProductGallery;