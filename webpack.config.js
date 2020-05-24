const path=require('path');

module.exports={
    mode:"development",
    entry:path.resolve(__dirname,'src','app'),
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',
        publicPath:'/'
    },
     resolve:{
         extensions:['.js','.jsx']
     },
     devServer:{
         historyApiFallback:true    
     },
    module:{
        rules:[
            {
                test:/\.jsx?/,
                loader:'babel-loader',
            },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] 
         
        },
        {
            test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
            loader: 'url-loader?limit=100000' ,
        }   
         
        ],
           
    }

}