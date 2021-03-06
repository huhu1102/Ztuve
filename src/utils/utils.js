import {getRequest} from './api'
import {toTreeData} from './api'
import {Message} from 'element-ui'

export const isNotNullORBlank = (...args)=> {
  for (var i = 0; i < args.length; i++) {
    var argument = args[i];
    if (argument == null || argument == '' || argument == undefined) {
      Message.warning({message: '数据不能为空!'})
      return false;
    }
  }
  return true;
}
export const initMenu = (router, store)=> {
  console.log(store.state.routes.length);

  if (store.state.routes.length > 0) {
    return;
  }
  console.log("utils. initMenu");
  getRequest("/config/getMenu").then(resp=> {
    if (resp && resp.status === 200) {
      console.log(resp);
      var menudata=  resp.data.root.menuData;


      var fmtRoutes = formatRoutes(menudata);
      let unique = (fmtRoutes)=> [...new Set(fmtRoutes)];
      // console.log(unique(fmtRoutes));
      // var  menuNow=unique(fmtRoutes)[0]
      router.push(unique(fmtRoutes));
      store.commit('initMenu', unique(fmtRoutes));
      //发起socockt连接
      store.dispatch('connect');
    }
  })
};
export const uploadImgToBase64= (file)=> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () { // 图片转base64完成后返回reader对象
      resolve(reader)
    }
    reader.onerror = reject
  })
}
export const formatRoutes = (routes)=> {
  let fmRoutes = [];
  // routes=toTreeData(routes);
  // console.log("hehehehe"+routes);
  routes.forEach(router=> {
    let {
      id,
      path,
      component,
      name,
      iconCls,
      children,
      parentId,
      isbtn,
      btnText
    } = router;
    let meta={
      keepAlive:router.keepAlive,
      requireAuth:router.requireAuth
    };

    let url=router.url;
    if (children && children instanceof Array&&children.length>0) {
      children = formatRoutes(children);
    }

    let fmRouter = {
      id:id,
      path: path,
      component(resolve){
        require(['../components/' + component + '.vue'], resolve)
        // if (component.startsWith("Home")) {
        //   require(['../components/' + component + '.vue'], resolve)
        // }
        // else if (component.startsWith("Emp")) {
        //   require(['../components/emp/' + component + '.vue'], resolve)
        // }
        // else if (component.startsWith("Car")) {
        //   require(['../components/dept/' + component + '.vue'], resolve)
        // } else if (component.startsWith("Pro")) {
        // } else if (component.startsWith("Depa")) {
        //   require(['../components/emp/' + component + '.vue'], resolve)
        // } else if (component.startsWith("Posi")) {
        //   require(['../components/emp/' + component + '.vue'], resolve)
        // } else if (component.startsWith("Sal")) {
        //   require(['../components/sale/' + component + '.vue'], resolve)
        // } else if (component.startsWith("Buy")) {
        //   require(['../components/dept/' + component + '.vue'], resolve)
        // }
      },
      name: name, 
      iconCls: iconCls,
      meta: meta,
      children: children,
      url:url,
      parentId:parentId,
      isbtn:isbtn,
      btnText:btnText
    };
    fmRoutes.push(fmRouter);
  });

  return fmRoutes;
};


