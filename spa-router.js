(function(){
  function loadPath(path, push){
    var map = {'/home':'/home.html','/home.html':'/home.html'};
    var url = map[path] || path;
    fetch(url).then(function(r){ if(!r.ok) throw new Error('Network response was not ok'); return r.text();}).then(function(html){
      var parser = new DOMParser();
      var doc = parser.parseFromString(html,'text/html');
      var root = document.getElementById('root');
      if(root){ root.innerHTML = doc.body.innerHTML; }
      var title = doc.querySelector('title');
      if(title) document.title = title.textContent;
      if(push) history.pushState({path:path},'',path);
    }).catch(function(e){ console.error('SPA router failed',e); });
  }
  function interceptLinks(e){
    var a = e.target.closest && e.target.closest('a');
    if(!a) return;
    var href = a.getAttribute('href');
    if(href === '/home' || href === '/home.html'){
      e.preventDefault();
      loadPath(href, true);
    }
  }
  window.addEventListener('DOMContentLoaded', function(){
    document.body.addEventListener('click', interceptLinks);
    window.addEventListener('popstate', function(e){ loadPath(location.pathname, false); });
    if(location.pathname === '/home' || location.pathname === '/home.html'){
      loadPath(location.pathname, false);
    }
  });
})();
