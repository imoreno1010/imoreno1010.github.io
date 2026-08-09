import type { ImageMetadata } from 'astro';
import defaultAvatar from '../assets/profile.jpeg';

/**
 * Allowed social entry keys in profile configuration.
 */
export type ProfileSocialKey = 'github' | 'x' | 'email' | 'website';

/**
 * One social link item rendered on `/about`.
 */
export interface ProfileSocialLink {
  key: ProfileSocialKey;
  label: string;
  url: string;
}

/**
 * Personal profile settings used by About page and article author schema.
 */
export interface ProfileConfig {
  /**
   * Optional avatar URL for About page and structured data.
   */
  avatar?: string | ImageMetadata;
  /**
   * Display name used across the site.
   */
  name: string;
  /**
   * Short headline/title shown on About page.
   */
  title: string;
  /**
   * Short bio text shown on About page and in schema.
   */
  bio: string;
  /**
   * Optional location text.
   */
  location?: string;
  /**
   * Optional contact email.
   */
  email?: string;
  /**
   * Personal GitHub profile URL (separate from repo URL).
   */
  githubProfileUrl: string;
  /**
   * Social links displayed in About page social row.
   */
  socials: ProfileSocialLink[];
}

export const profileConfig: ProfileConfig = {
  avatar: defaultAvatar,
  name: 'Isabella Moreno',
  title: 'Estudiante de Ingeniería de Sistemas',
  bio: 'Estudiante de Ingeniería de Sistemas en la Universidad El Bosque, apasionada por crear y diseñar. Persona activa, a la que le encanta viajar y explorar nuevas experiencias. Este portafolio documenta mi proceso de aprendizaje en Bases de Datos 1, una materia que espero me ayude a organizar mejor mis ideas y proyectos.',
  location: 'Bogotá, Colombia',
  email: 'isabellamorenop1010@gmail.com',
  githubProfileUrl: 'https://github.com/imoreno1010',
  socials: [
    { key: 'github', label: 'GitHub', url: 'https://github.com/imoreno1010' },
    { key: 'email', label: 'Correo', url: 'mailto:isabellamorenop1010@gmail.com' },
  ],
};
