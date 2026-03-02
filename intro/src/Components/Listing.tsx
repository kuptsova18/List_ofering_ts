import './Listing.css';
import React from 'react';

interface MainImage {
    url_170x135?: string;
    url_570xN?: string;
}

interface Item {
  listing_id: number;
  title?: string;
  price?: string;
  currency_code?: string;
  quantity?: number;
  MainImage?: MainImage;
}

interface ItemCardProps {
  item: Item;
}

const ItemCard:React.FC<ItemCardProps> = ({ item }) => {
    if (!item || !item.listing_id) {
        return null;
    }

    const formatTitle = (title?: string): string => {
        if (!title) return 'Без названия';
        return title.length > 50 ? `${title.substring(0, 50)}...` : title;
    };

    const formatPrice = (price?: string, currencyCode?: string): string => {
        if (!price) return 'Цена не указана';
        switch (currencyCode) {
            case 'USD':
                return `$${price}`;
            case 'EUR':
                return `€${price}`;
            case 'GBP':
                return `£${price}`;
            default:
                return `${currencyCode} ${price}`;
        }
    }

    const getStockClass = (quantity?: number): string=> {
        if(!quantity) return 'stock-low';
        if (quantity <= 10) return 'stock-low';
        if (quantity <= 200) return 'stock-medium';
        return 'stock-high'
    }

    return (
        <div className='product-card'>
            <img src={item.MainImage?.url_170x135|| ''}
                alt={item.title || 'Product-image'}
                className='product-image'></img>
            <div className='product-info'>
                <h3 className='product-title'>{formatTitle(item.title)}</h3>
                <div className='price-container'>
                    <div className='product-price'>{formatPrice(item.price, item.currency_code)}</div>
                    <span className={`stock-badge ${getStockClass(item.quantity)}`}>
                        {item.quantity} left
                    </span>
                </div>
            </div>
        </div>
    );
}

interface ListingProps {
  items?: Item[];
}

const Listing:React.FC<ListingProps> = ({ items = [] }) => {
    const validItems = items.filter(item =>
        item &&
        item.listing_id &&
        item.MainImage?.url_570xN
    );
    return (
        <div className='listing-container'>
            {
                validItems.map(item => (
                    <ItemCard key={item.listing_id} item={item} />
                ))
            }
        </div>
    )
}

export default Listing;