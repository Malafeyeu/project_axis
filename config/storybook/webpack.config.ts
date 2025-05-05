import webpack, { RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: {config: webpack.Configuration}) => {
  const newConfig = { ...config };
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
  };
  newConfig.resolve = newConfig.resolve || {};
  newConfig.resolve.modules = newConfig.resolve.modules || [];
  newConfig.resolve.modules.push(paths.src);
  newConfig.resolve.extensions = newConfig.resolve.extensions || [];
  newConfig.resolve.extensions.push('.ts', '.tsx');

  newConfig.module = newConfig.module || {};
  newConfig.module.rules = newConfig.module.rules || [];

  newConfig.module.rules = newConfig.module.rules.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }

    return rule;
  });

  newConfig.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });
  newConfig.module.rules.push(buildCssLoader(true));

  return config;
};
