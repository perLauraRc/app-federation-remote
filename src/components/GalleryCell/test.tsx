import { render, screen } from '@testing-library/react';
import GalleryCell, { type GalleryCellProps } from '.';

describe('GalleryCell', () => {
  const props: GalleryCellProps = {
    imageSrc: 'test.jpg',
    alt: 'Test image',
    title: 'Test Title',
    description: 'Test Description',
  };

  it('renders image, title, and description', () => {
    render(<GalleryCell {...props} />);
    expect(screen.getByAltText('Test image')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders without title and description', () => {
    render(<GalleryCell imageSrc="test.jpg" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
