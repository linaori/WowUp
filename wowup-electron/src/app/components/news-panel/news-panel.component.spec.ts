import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateMessageFormatCompiler } from "ngx-translate-messageformat-compiler";
import { BehaviorSubject } from "rxjs";
import { httpLoaderFactory } from "../../app.module";
import { MatModule } from "../../mat-module";
import { ElectronService } from "../../services";
import { DialogFactory } from "../../services/dialog/dialog.factory";
import { NewsService } from "../../services/news/news.service";
import { SessionService } from "../../services/session/session.service";
import { WowUpService } from "../../services/wowup/wowup.service";
import { getStandardImports } from "../../tests/test-helpers";

import { NewsPanelComponent } from "./news-panel.component";

describe("NewsPanelComponent", () => {
  let component: NewsPanelComponent;
  let fixture: ComponentFixture<NewsPanelComponent>;
  let electronService: ElectronService;
  let newsService: NewsService;
  let dialogFactory: DialogFactory;
  let wowUpService: WowUpService;
  let sessionService: SessionService;

  beforeEach(async () => {
    electronService = jasmine.createSpyObj("ElectronService", [""], {
      onRendererEvent: () => undefined,
    });

    newsService = jasmine.createSpyObj("NewsService", [""], {
      newsItems$: new BehaviorSubject([]),
    });
    dialogFactory = jasmine.createSpyObj("DialogFactory", [""], {});
    wowUpService = jasmine.createSpyObj("WowUpService", [""], {});
    sessionService = jasmine.createSpyObj("SessionService", [""], {
      selectedHomeTab$: new BehaviorSubject(0),
      setContextText: () => {},
    });

    let testBed = TestBed.configureTestingModule({
      declarations: [NewsPanelComponent],
      imports: [...getStandardImports()],
    });

    testBed = testBed.overrideComponent(NewsPanelComponent, {
      set: {
        providers: [
          { provide: NewsService, useValue: newsService },
          { provide: WowUpService, useValue: wowUpService },
          { provide: SessionService, useValue: sessionService },
          { provide: DialogFactory, useValue: dialogFactory },
          {
            provide: ElectronService,
            useValue: electronService,
          },
        ],
      },
    });

    await testBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
