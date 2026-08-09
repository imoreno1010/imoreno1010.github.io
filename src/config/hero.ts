import defaultBackground from '../assets/blog-placeholder-1.webp';

/**
 * Hero copy and background settings for one page.
 */
export interface HeroSectionConfig {
  /**
   * Main hero headline text.
   */
  text: string;
  /**
   * Optional hero subtitle text.
   */
  subtitle?: string;
  /**
   * Hero background image URL.
   */
  backgroundImage: string;
}

/**
 * Centralized hero configuration for all top-level pages and post fallback.
 */
export interface HeroConfig {
  home: HeroSectionConfig;
  blog: HeroSectionConfig;
  tags: HeroSectionConfig;
  about: HeroSectionConfig;
  /**
   * Default hero image shared by all article pages.
   */
  postDefaultBackground: string;
}

export const heroConfig: HeroConfig = {
  home: {
  text: 'Hola, soy Isabella Moreno Pérez',
  subtitle: 'Estudiante de Ingeniería de Sistemas construyendo mi portafolio profesional',
  backgroundImage: defaultBackground.src,
  },
  blog: {
    text: 'Blogs',
    subtitle: 'Portafolio Bases de Datos 1, organizado por blogs del proceso de mi aprendizaje',
    backgroundImage: defaultBackground.src,
  },
  tags: {
    text: 'Evidencias',
    subtitle: 'Portafolio Bases de Datos 1, organizado por tema: Modelado, Normalización, SQL y Proyecto',
    backgroundImage: defaultBackground.src,
  },
  about: {
    text: 'Bienvenido',
    subtitle: 'Conoce quién soy y mi paso a paso este semestre',
    backgroundImage: defaultBackground.src,
  },
  postDefaultBackground: defaultBackground.src,
};
