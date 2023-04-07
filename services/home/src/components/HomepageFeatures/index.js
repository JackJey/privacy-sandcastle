import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'DEMO of Privacy Sandbox API Families',
    Svg: require('@site/static/img/home-hero-user.svg').default,
    description: (
      <>
        Privacy Sandcastle is the DEMO project for
        covering every Privacy Sandbox API in single demo.
      </>
    ),
  },
  {
    title: 'Covering real world use-cases',
    Svg: require('@site/static/img/padlock-information.svg').default,
    description: (
      <>
        Privacy Sandcastle focuses on not only each API usage
        But align with real world use-cases for combination of APIs
      </>
    ),
  },
  {
    title: 'Locally Runnable',
    Svg: require('@site/static/img/shield-information.svg').default,
    description: (
      <>
        Privacy Sandcastle make local development easy by pre configured
        Valid domain/certificates and Origin Trials token embedding.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
