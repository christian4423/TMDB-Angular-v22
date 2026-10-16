import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Watchlist } from './watchlist';

describe('Watchlist', () => {
  let component: Watchlist;
  let fixture: ComponentFixture<Watchlist>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Watchlist],
    }).compileComponents();

    fixture = TestBed.createComponent(Watchlist);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  const firstItem = () => el.querySelector<HTMLElement>('[role="checkbox"]')!;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('exposes each movie as a labelled checkbox', () => {
    expect(firstItem().getAttribute('aria-label')).toBe('Watched: Movie 1');
    expect(firstItem().getAttribute('aria-checked')).toBe('false');
  });

  it('toggles watched on click and updates the count', async () => {
    firstItem().click();
    await fixture.whenStable();
    expect(firstItem().getAttribute('aria-checked')).toBe('true');
    expect(component.watchedCount()).toBe(2);
  });

  it.each(['Enter', ' '])('toggles watched with the "%s" key', async key => {
    firstItem().dispatchEvent(new KeyboardEvent('keydown', { key }));
    await fixture.whenStable();
    expect(firstItem().getAttribute('aria-checked')).toBe('true');
  });

  it('ignores other keys', async () => {
    firstItem().dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    await fixture.whenStable();
    expect(firstItem().getAttribute('aria-checked')).toBe('false');
  });
});
