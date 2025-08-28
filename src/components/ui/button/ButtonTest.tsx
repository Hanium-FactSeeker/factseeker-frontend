import { Button } from './index';
import { KakaoLoginButton } from './KakaoLoginButton';
import { NaverLoginButton } from './NaverLoginButton';
import ToggleButton from './ToggleButton';

const sizes = ['xxs', 'xs', 'sm', 'md', 'lg'] as const;
const sizeLabel = {
  xxs: 'XXS길게보기',
  xs: 'XS길게',
  sm: 'SM길게',
  md: '중간',
  lg: '크게보기',
};
const toggleSizeLabel = {
  xxs: 'Text XXS길게보기',
  xs: 'Text XS길게',
  sm: 'Text SM길게',
  md: 'Text 중간',
  lg: 'Text 크게보기',
};

export default function ButtonTest() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="mb-6 text-2xl font-bold">Button 디자인/사이즈 테스트</h2>
      <div className="space-y-10">
        {/* Filled */}
        <div>
          <h3 className="mb-2 font-semibold">Filled Buttons</h3>
          {['default', 'black', 'gray', 'purple'].map((color) => (
            <div key={color} className="mb-2">
              <div className="mb-1 text-sm font-medium">{color}</div>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <Button key={size} color={color as any} size={size as any}>
                    {sizeLabel[size]}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Outline */}
        <div>
          <h3 className="mb-2 font-semibold">Outline Buttons</h3>
          {['default', 'black', 'gray', 'purple'].map((color) => (
            <div key={color} className="mb-2">
              <div className="mb-1 text-sm font-medium">{color}</div>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant="outline"
                    color={color as any}
                    size={size as any}
                  >
                    {sizeLabel[size]}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Toggle */}
        <div>
          <h3 className="mb-2 text-xl font-bold">Toggle Buttons</h3>
          <div className="flex flex-wrap gap-4">
            {sizes.map((size) => (
              <ToggleButton
                key={size}
                size={size}
                label={toggleSizeLabel[size]}
              />
            ))}
          </div>
        </div>

        {/* SNS Login */}
        <div>
          <h3 className="mb-2 font-semibold">SNS Login Buttons</h3>
          <div className="flex w-full max-w-md flex-col gap-3">
            <KakaoLoginButton />
            <NaverLoginButton />
          </div>
        </div>

        {/* Full Width & Large */}
        <div>
          <h3 className="mb-2 font-semibold">Full Width & Large</h3>
          <div className="w-full max-w-md space-y-2">
            <Button color="black" size="lg" fullWidth>
              다른 뉴스 분석하기
            </Button>
            <Button color="black" size="lg" fullWidth>
              로그인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
