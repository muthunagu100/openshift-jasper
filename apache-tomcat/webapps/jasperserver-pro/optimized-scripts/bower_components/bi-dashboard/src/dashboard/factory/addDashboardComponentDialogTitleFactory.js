define(["require","bundle!DashboardBundle","dashboard/enum/dashboardComponentTypes"],function(e){var a=e("bundle!DashboardBundle"),o=e("dashboard/enum/dashboardComponentTypes"),t={},d=a["dashboard.base.dialog.properties.title"];return t[o.WEB_PAGE_VIEW]=a["dashboard.component.web.page.view.add.component.dialog.title"],t[o.FREE_TEXT]=a["dashboard.component.text.add.component.dialog.title"],t[o.CROSSTAB]=a["dashboard.component.crosstab.save.title"],t[o.TABLE]=a["dashboard.component.table.save.title"],t[o.CHART]=a["dashboard.component.chart.save.title"],t[o.ICHART]=a["dashboard.component.ichart.save.title"],function(e){var a,o=(a=e.get("type"))in t?t[a]:d;return o}});