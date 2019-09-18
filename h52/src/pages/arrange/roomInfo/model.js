import { Model } from 'dvax'
import { message } from 'antd'
import constants from 'utils/constants'
Model.create({
    namespace: 'roomInfo',
    state: {
        list: [],
        courseCategory:'',
        provinces:[],
        cities:[],
        cityId:'',
        areaId:'',
        pagination:{
            current:1,
            defaultCurrent: 1,
            pageSize: constants.PAGESIZE,
            total: 0,
            showQuickJumper: true 
        }
    },
    effects:{
        *getProvinces({fetch,change}){ 
            const res = yield fetch(`geo/provinces`)
            if(res.hasErrors) return
            yield change('provinces',res.data)         
        },
        *getCities({fetch,change},{provinceCode}){
          const res=yield fetch(`geo/${provinceCode}/cities`)
          yield change('cities',res.data)
        },
        * delete({fetch,put},{id}){
            const res = yield fetch(`classroom-info/${id}/delete`,{method:'post'})
            if(res.errorCode==='11000') {
                message.warning('课程分类已被课程信息引用，无法删除')
            }
            if(res.hasErrors) return
            yield put({type:'getRoom'})
        },
        * getRoom({fetch,get,change}){    
            const query = {}
            query.pageNum = get().pagination.current
            query.pageSize = get().pagination.pageSize
            query.cityId = get().cityId
            query.schoolAreaId = get().areaId
            const res = yield fetch(`classroom-info`,{query})
            if(res.hasErrors) return
            res.data.records.sort((a,b)=>b.createTime - a.createTime)
            yield change('list',res.data.records)
            console.log(res.data.records)
            yield change('pagination.total',res.data.totalRecords)
        },
        * changePage({fetch,get,change},{pageInfo}){
            const current = pageInfo.current
            yield change('pagination.current',current)
            
            const query = get().pagination
            query.pageNum = query.current
            const res = yield fetch(`course-categories`,{query})
            yield change('list',res.data.records)
        }
    }
})
