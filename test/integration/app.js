import Descent from '../../src';

// For ease of tesing
window.Descent = Descent;
window.descent = new Descent();

export async function initDescent() {
  const descent = await Descent.create('browser', { ethereum: window.ethereum });

  return descent;
}
